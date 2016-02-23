package skyee;

import com.bazaarvoice.dropwizard.webjars.WebJarBundle;
import de.spinscale.dropwizard.jobs.JobsBundle;
import skyee.api.BroadcasterResource;
import skyee.ws.BroadcastServlet;
import io.dropwizard.Application;
import io.dropwizard.Configuration;
import io.dropwizard.assets.AssetsBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;

public class AppService extends Application<Configuration> {

   public static void main(String[] args) throws Exception {
      new AppService().run("server", "src/main/config/default.yml");
   }

   @Override
   public void initialize(Bootstrap<Configuration> bootstrap) {
      bootstrap.addBundle(new JobsBundle("skyee.scheduler"));
      bootstrap.addBundle(new WebJarBundle());
      bootstrap.addBundle(new WebJarBundle());
      bootstrap.addBundle(new AssetsBundle("/web", "/web", "normal.html", "web"));
   }

   @Override
   public void run(Configuration conf, Environment env) throws Exception {
      env.jersey().register(new BroadcasterResource(env.getObjectMapper()));

      env.getApplicationContext().getServletHandler().addServletWithMapping(
         BroadcastServlet.class, "/ws/*"
      );
   }
}
