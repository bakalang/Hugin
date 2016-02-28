package skyee.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import skyee.bean.Resopnse;
import skyee.ws.BroadcastSocket;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;

@Path("broadcast")
public class BroadcasterResource {

   private final ObjectMapper mapper;

   public BroadcasterResource(ObjectMapper mapper) {
      this.mapper = mapper;
   }

   @POST
   @Consumes("text/plain")
   public void broadcastString(String data) throws Exception {
//      Resopnse rs = new Resopnse();
//      rs.setMessage(data);
      BroadcastSocket.broadcast(new Resopnse("message", data).returnResponse());
   }
}
