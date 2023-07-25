import React from "react";
import styled from "styled-components";
import { NModals } from "../modals/modals";
import { modals as allModals } from "../modals/modals";

const Layout = (props: NLayout.IProps) => {
  const { children } = props;
  const query = new URLSearchParams(window.location.search);
	
  const shouldShowExample = query.has("example-modal");

  const [ modals, setModals ] = React.useState<NModals.TModals>({ ...(shouldShowExample ? { ModalExample: { open: true } } : {}) });

  React.useEffect(() => {
    const changeModals = (event: WindowEventMap["changeModals"]) => {
      setModals({
        ...modals,
        ...(typeof event?.detail === "object" && !Array.isArray(event?.detail) ? event?.detail : {})
      });
    };

    window.addEventListener("changeModals", changeModals);
    return () => {
      window.removeEventListener("changeModals", changeModals);
    };
  }, []);

  return <LayoutStyle>
    {allModals.map(
      (modal, index) =>
        modal.name in modals && modals?.[modal.name] ?
          <modal.Modal key={index} {...modals[modal.name]} />
          : null
    )}
    {children}
  </LayoutStyle>;
};

export { Layout };

export namespace NLayout {
	export interface IProps {
		children?: JSX.Element;
		padding?: boolean;
		showHeader?: boolean;
		showFooter?: boolean;
	}
}

const LayoutStyle = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	overflow-x: hidden;
	flex-direction: column;

	@function hexToRGB($hex) {
		@return red($hex), green($hex), blue($hex);
	}
`;