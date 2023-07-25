/* eslint-disable no-var */
import { NModals } from "../components/modals/modals";

declare global {
	interface WindowEventMap {
		"changeModals": CustomEvent<NModals.TModals>
	}
}

export {};