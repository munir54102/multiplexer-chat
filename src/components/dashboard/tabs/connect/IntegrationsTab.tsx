
import React from "react";
import MessagingPlatforms from "./integrations/MessagingPlatforms";
import BusinessTools from "./integrations/BusinessTools";
import KnowledgeBases from "./integrations/KnowledgeBases";

const IntegrationsTab = () => {
  return (
    <div className="space-y-6">
      <MessagingPlatforms />
      <BusinessTools />
      <KnowledgeBases />
    </div>
  );
};

export default IntegrationsTab;
