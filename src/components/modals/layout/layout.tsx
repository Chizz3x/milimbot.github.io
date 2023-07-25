import React from "react";
import styled from "styled-components";
import { NModals, changeModals } from "../modals";

const ModalLayout = (props: NModalLayout.IProps) => {
  const { children, name } = props;

  const closeModal: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if(event.currentTarget === event.target) {
      window.dispatchEvent(changeModals({ [name]: null }));
    }
  };

  return <ModalLayoutStyle className='Modal' onClick={closeModal}>
    <div className='modal_inner'>
      {children}
    </div>
  </ModalLayoutStyle>;
};

export { ModalLayout };

export namespace NModalLayout {
	export interface IProps extends NModals.IDefaultProps {
		children?: JSX.Element;
		name: string;
	}
}

const ModalLayoutStyle = styled.div`
	height: 100vh;
	width: 100vw;
	position: absolute;
	z-index: 999;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: var(--c-p1-aa);
	backdrop-filter: blur(5px);
	.modal_inner {
		background-color: var(--c-p1);
		padding: 20px;
		border-radius: 5px;
		position: relative;
		box-shadow: 0 0 15px var(--c-p1);
	}
`;