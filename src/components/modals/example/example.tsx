import React from "react";
import styled from "styled-components";
import { NModals } from "../modals";
import { ModalLayout } from "../layout";

const name = "ModalExample";
const Modal = (props: NModalExample.IProps) => {
  return <ModalLayout {...props} name={name}>
    <ModalExampleStyle>
      Modal Example
    </ModalExampleStyle>
  </ModalLayout>;
};

export { name, Modal };

export namespace NModalExample {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface IProps extends NModals.IDefaultProps {
		// ---
	}
}

const ModalExampleStyle = styled.div`
	// ---
`;