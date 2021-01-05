import TCallback from "./TCallback";

type TCustomAction = { type: string, payload: unknown, onComplete?: TCallback }

export default TCustomAction;