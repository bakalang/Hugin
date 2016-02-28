package skyee.bean;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.eclipse.jetty.websocket.api.Session;
import org.joda.time.format.DateTimeFormat;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class Resopnse {
    private String event;
    private String message;
    private String datetime;
    private List<WSSession> wssessions = new ArrayList<WSSession>();

    public Resopnse(String event) {
        this.event = event;
        this.datetime = DateTimeFormat.forPattern("yyyy-MM-dd hh:mm:ss").print(new org.joda.time.DateTime());
    }

    public Resopnse(String event, String message) {
        this.event = event;
        this.message = message;
    }

    public Resopnse(String event, Set<Session> sessions) {
        this.event = event;
        sessions.forEach(session -> {
            this.wssessions.add(new WSSession(session.getRemoteAddress().toString(), String.valueOf(session.hashCode())));
        });

    }

    public String getEvent() {
        return event;
    }

    public void setEvent(String event) {
        this.event = event;
    }

    public String getDatetime() {
        return datetime;
    }

    public void setDatetime(String datetime) {
        this.datetime = datetime;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<WSSession> getWssessions() {
        return wssessions;
    }

    public void setWssessions(List<WSSession> wssessions) {
        this.wssessions = wssessions;
    }

    public String returnResponse() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(this);
    }
}
