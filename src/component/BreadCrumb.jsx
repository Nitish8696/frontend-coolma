import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb flex text-blue-500 cursor-pointer font-[500] ">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
          {pathnames.length > 0 && (
            <span className="mx-2">&gt;</span>
          )}
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return (
            <React.Fragment key={name}>
              {!isLast && (
                <li className="breadcrumb-item ">
                  <Link to={routeTo} className="">{name}</Link>
                  <span className="mx-2">&gt;</span>
                </li>
              )}
              {isLast && (
                <li className="breadcrumb-item active text-black">
                  <div className="break-all">{name}</div>
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
