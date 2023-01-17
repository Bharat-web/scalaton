import knexJs from "knex";
import knexConfig from "../../../../knexfile";

const knex = knexJs( knexConfig );

class BaseModel {
    constructor() {

    }

    fetchAll( where = {}, table = this.table ) {
        return knex( table )
            .select()
            .where( where )
            .then( ( res ) => {
                return res;
            });
    }

    fetchFirst( where = {}, table = this.table ) {
        return knex( table )
            .select()
            .where( where )
            .first()
            .then( ( res ) => {
                return res;
            });
    }

    fetchSelectedFieldObject( col, where = {}, table = this.table ) {
        return knex( table )
            .select( knex.raw(col) )
            .where( where )
            .first()
            .then( ( res ) => {
                return res;
            });
    }

    createObj( properties, table = this.table ) {
        return knex( table )
            .insert( properties )
            .then( ( res ) => {
                return res;
            } );
    }

    updateObj( cols, where, table = this.table ) {
        return knex( table )
            .update( cols )
            .where( where )
            .then( ( res ) => {
                return res;
            } );
    }

}

export default BaseModel;