import React, { useState } from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { trpc } from "./trpc";

import "./index.css";

const client = new QueryClient();

const AppContent = () => (
  <div className="container">
    <div>Name: client</div>
    <div>Framework: react</div>
    <div>Language: TypeScript</div>
    <div>CSS: Empty CSS</div>
  </div>
);

const App = () => {
  const [trpcClient] = useState(() => {
    trpc.createClient({
      url: "http://localhost:8080/trpc",
    });
  });

  return (
    <trpc.Provider client={trpcClient as any} queryClient={client}>
      <QueryClientProvider client={client}>
        <AppContent />
      </QueryClientProvider>
    </trpc.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
