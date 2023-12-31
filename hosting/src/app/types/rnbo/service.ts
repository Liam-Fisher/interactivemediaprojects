import { IPatcher } from "@rnbo/js";
import { ConnectionMap } from "../rnboTypes";
// Data (required), Message (some required), Options (none required)
type BufferID = string | number;
type BufferSource = string | AudioBuffer | ArrayBuffer;
export interface BufferLoadData {
    id: BufferID,
    src: BufferSource,
    channelCount?: number
}
export interface DeviceLoadData {
    id: string,
    folder?: string,
    patcher?: IPatcher
    connections?: ConnectionMap;
    local?: boolean;
  }