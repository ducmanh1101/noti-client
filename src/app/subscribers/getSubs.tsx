import React from "react";
export interface subsType {
  channels: [
    {
      _integrationId: string;
      credentials: {
        channel: string;
        deviceTokens: [string];
        webhookUrl: string;
      };
      integrationIdentifier: string;
      providerId: string;
    }
  ];
  createdAt: string;
  deleted: boolean;
  email: string;
  firstName: string;
  id: string;
  isOnline: boolean;
  lastName: string;
  lastOnlineAt: string;
  phone: string;
  subscriberId: string;
  updatedAt: string;
  __v: number;
  _environmentId: number;
  _id: string;
  _organizationId: string;
}
export const getSubs = () => {
  return <div>getSubs</div>;
};
