
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const NotFound = () => {
  return (
    <Layout>
      <section className="pt-32 pb-20 px-4 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="container mx-auto max-w-md text-center">
          <h1 className="text-6xl font-bold text-primary mb-6">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button size="lg" asChild>
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
