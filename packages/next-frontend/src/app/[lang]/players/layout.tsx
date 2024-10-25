import React from "react";

const Layout = ({ children }: React.PropsWithChildren) => {
  return <div className="bg-slate-800">{children}</div>;
};

export default Layout;
