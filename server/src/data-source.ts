import "reflect-metadata"
import { DataSource } from "typeorm"
import { Project } from "./entity/Project"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [Project],
    migrations: [],
    subscribers: [],
})
