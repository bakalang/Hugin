package skyee.scheduler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.spinscale.dropwizard.jobs.Job;
import de.spinscale.dropwizard.jobs.annotations.On;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import skyee.bean.Resopnse;
import skyee.ws.BroadcastSocket;

@On("0/10 * * * * ?")
public class ServerPull extends Job {


    Logger log = LoggerFactory.getLogger(ServerPull.class);
    @Override
    public void doJob() {
//        DateTime now = new org.joda.time.DateTime();
//        DateTimeFormatter dtfm = DateTimeFormat.forPattern("yyyy-MM-dd hh:mm:ss");
//        log.info("datetime => {}", dtfm.print(now));
//        Resopnse rs = new Resopnse("datetime").returnResponse();
//        rs.setDatetime(dtfm.print(now));


        ObjectMapper mapper = new ObjectMapper();
        try {
//            log.info("broadcast => {}", mapper.writeValueAsString(rs));
            BroadcastSocket.broadcast(new Resopnse("datetime").returnResponse());
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }
}
