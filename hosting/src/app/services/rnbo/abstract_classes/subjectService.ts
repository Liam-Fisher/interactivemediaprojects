import { BehaviorSubject, Subscription } from "rxjs";
import { IRnboService } from "./serviceBase";

export abstract class IRnboSubjectService<Obj extends {subject: BehaviorSubject<Data>}, Data> extends IRnboService<Obj, Data> {
    getData(device_id: string | null, key: string | null): Data | null {
      return this.getProp(device_id, key, 'subject')?.value ?? null;
    }
    setData(device_id: string | null, key: string | null, value: Data | null): void {
      return value ? this.getProp(device_id, key, 'subject')?.next(value) : void 0;    
    }
}