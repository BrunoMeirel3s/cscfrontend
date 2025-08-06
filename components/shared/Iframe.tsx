import React from "react";

const Iframe = async ({ url }: { url: string }) => {
  return <iframe src={url} width="100%" height="480"></iframe>;
};

export default Iframe;
