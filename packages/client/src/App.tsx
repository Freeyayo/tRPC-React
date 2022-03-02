import React, { useState } from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { trpc } from "./trpc";

import "./index.css";

const client = new QueryClient();

const AppContent = () => {
  const getMessages = trpc.useQuery(["getMessages"]);
  return (
    <div className="container">
      <div>DATA:</div>
      <div>{JSON.stringify(getMessages.data)}</div>
    </div>
  );
};

const App = () => {
  const [trpcClient] = useState(() => {
    return trpc.createClient({
      url: "http://localhost:8080/trpc",
    });
  });

  return (
    <trpc.Provider client={trpcClient} queryClient={client}>
      <QueryClientProvider client={client}>
        <AppContent />
      </QueryClientProvider>
    </trpc.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
