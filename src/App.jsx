import { useState } from "react";
import { TicketGeneratorForm } from "./components/TicketGeneratorForm";
import { TicketGeneratorLayout } from "./Layouts/TicketGenerator";
function App() {
  return (
    <>
      <TicketGeneratorLayout>
        <TicketGeneratorForm />
      </TicketGeneratorLayout>
    </>
  );
}

export default App;
