import { v4 as uuidv4 } from 'uuid';
import {IIDGenerator} from "../../ports/id-generator.port";

export class IDGenerator implements IIDGenerator {
    generate(): string {
        return uuidv4();
    }
}
