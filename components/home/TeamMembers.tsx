import PrimaryHeadline from "../global/primary-headline";
import React from "react";
import { TeamMembersCarousel } from "../shared/TeamMembersCarousel";

const TeamMembers = () => {
  return (
    <>
      <div className="container pb-40 sm:pb-40 lg:pb-52">
        <PrimaryHeadline text="Nosso Time" />
        <TeamMembersCarousel />
      </div>
    </>
  );
};

export default TeamMembers;
