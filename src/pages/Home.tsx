import React from "react";
import styled from "styled-components";

const PageHome = () => {
  return <PageHomeStyle id="PageHome">
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure><img src="/images/my-image.jpg" alt="Shoes" /></figure>
      <div className="card-body">
        <h2 className="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  </PageHomeStyle>;
};

export { PageHome };

const PageHomeStyle = styled.div`
  flex-shrink: 0;
  flex-grow: 1;
`;
