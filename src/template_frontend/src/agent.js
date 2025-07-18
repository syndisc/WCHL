import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory as lms_idl, canisterId as lms_id } from "./declarations/lms";

const agent = new HttpAgent({ host: "http://localhost:4943" }); // or IC host

// Uncomment if you're running locally
// await agent.fetchRootKey();

export const lmsActor = Actor.createActor(lms_idl, {
  agent,
  canisterId: lms_id,
});
