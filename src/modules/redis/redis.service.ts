import { InjectRedis } from "@nestjs-modules/ioredis";
import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { Redis } from "ioredis";
@Injectable()
export class RedisService implements OnModuleDestroy {
    constructor(@InjectRedis() private redis: Redis) {}
    async set(key:string,value:string,expireTime?:number){
        if(expireTime){
            await this.redis.set(key,value,"EX",expireTime);
        } else {
            await this.redis.set(key,value);
        }
    }
    async get(key:string) {
        return await this.redis.get(key);
    }
    async del(key:string) {
        return await this.redis.del(key);
    }
    onModuleDestroy() {
        this.redis.disconnect();
    }
}