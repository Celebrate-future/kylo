/**
 * 
 */
package com.thinkbiganalytics.metadata.modeshape.support;

import java.io.PrintStream;
import java.io.PrintWriter;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;

import org.modeshape.jcr.api.JcrTools;

/**
 * Extension of the ModeShape JcrTools that allows printing to any PrintStream, and not just
 * System.out.
 * @author Sean Felten
 */
public class JcrTool extends JcrTools {

    private final PrintWriter out;
    
    public JcrTool() {
        this(false);
    }

    public JcrTool(boolean debug) {
        this(debug, System.out);
    }
    
    public JcrTool(boolean debug, PrintStream out) {
        this(debug, new PrintWriter(out));
    }
    
    public JcrTool(boolean debug, PrintWriter out) {
        super(debug);
        this.out = out;
    }

    @Override
    public void print(Object msg) {
        if (isDebug() && msg != null) {
            out.println(msg.toString());
        }
    }
    
    public void printNode(Session session, String absPath) {
        try {
            Node node = session.getNode(absPath);
            super.printNode(node);
        } catch (RepositoryException e) {
            e.printStackTrace(this.out);
        }
    }
    
    public void printSubgraph(Session session, String absPath) {
        try {
            Node node = session.getNode(absPath);
            super.printSubgraph(node);
        } catch (RepositoryException e) {
            e.printStackTrace(this.out);
        }
    }
}
