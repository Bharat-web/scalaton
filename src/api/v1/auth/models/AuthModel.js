import knexJs from "knex";
import knexConfig from "../../../../knexfile";
import BaseModel from "./BaseModel";

const knex = knexJs( knexConfig );

export default class authModel extends BaseModel {
    constructor() {
        super();
        this.table = "users";
    }

    checkUserLogin( where = {}, orWhere = {}, cols = "*" ) {
        let prepareQuery = knex( this.table )
            .select( knex.raw( cols ) )
            .where( where )
            .orWhere( orWhere )
            .first();

        console.log("prepareQuery -", prepareQuery.toString());
        return prepareQuery = prepareQuery.then( ( res ) => {
            return res;
        });
    }
}
 