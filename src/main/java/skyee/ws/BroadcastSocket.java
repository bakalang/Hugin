package skyee.ws;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.WebSocketAdapter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import skyee.bean.Resopnse;

import java.io.IOException;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

public class BroadcastSocket extends WebSocketAdapter {

    private static final Logger log = LoggerFactory.getLogger(BroadcastSocket.class);
    private ObjectMapper mapper = new ObjectMapper();
    private static Set<Session> sessions = new CopyOnWriteArraySet<>();

   @Override
    public void onWebSocketConnect(Session session) {
        super.onWebSocketConnect(session);
        sessions.add(session);
        log.info("Socket Connected: {}", Integer.toHexString(session.hashCode()));
       try {
           this.broadcast(new Resopnse("slist", sessions).returnResponse());
       } catch (JsonProcessingException e) {
           e.printStackTrace();
       }
       ;
    }

   @Override
   public void onWebSocketClose(int statusCode, String reason) {
      sessions.remove(getSession());
      super.onWebSocketClose(statusCode, reason);
      log.info("Socket Closed: [{}] {}", statusCode, reason);
   }

   @Override
   public void onWebSocketError(Throwable cause) {
      super.onWebSocketError(cause);
      log.error("Websocket error", cause);
   }

   @Override
   public void onWebSocketText(String message) {
       try {
//           Map<String, Object> returnMap = mapper.readValue(message, new TypeReference<Map<String, Object>>()
//           {});
//           log.info("receive form {}, event: {}, data: {}", Integer.toHexString(getSession().hashCode()), returnMap.get("event"), returnMap.get("data"));

           this.broadcast(new Resopnse("message", message).returnResponse());
       } catch (IOException e) {
           e.printStackTrace();
       }
   }

   public static void broadcast(String msg) {
      sessions.forEach(session -> {
         try {
             session.getRemote().sendString(msg);
             log.info("msg send: [{}] {}", session.hashCode(), msg);
         } catch (IOException e) {
            log.error("Problem broadcasting message", e);
         }
      });
   }

}
