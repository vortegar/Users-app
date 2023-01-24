import { localhostUserToModel } from "../mappers/localhost-user-mappers";
import { userModelToLocalhost } from "../mappers/user-to-localhost.mapper";
import { User } from "../models/user"


/**
 * 
 * @param {Like<User>} userLike 
 */


export const saveUser = async( userLike ) => {
    
    const user = new User( userLike );

    if ( !user.firstName || !user.lastName ) 
        throw 'First & Last Name are required';

    const userTosave = userModelToLocalhost( user );
    let userUpdated;

    if ( user.id ) {
        userUpdated = await updateUser( userTosave );
    }else{
        userUpdated = await createUser ( userTosave );
    }

    return localhostUserToModel( userUpdated );
}

/**
 * @param {Like<User>} user
 */
const createUser = async( user ) => {

    const url = `${ import.meta.env.VITE_BASE_URL }/users`;
    const res = await fetch(url,{
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const newUser = await res.json();
    console.log({newUser});
    return newUser;
}


/**
 * @param {Like<User>} user
 */
const updateUser = async( user ) => {

    const url = `${ import.meta.env.VITE_BASE_URL }/users/${ user.id }`;
    const res = await fetch(url,{
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const updateUser = await res.json();
    return updateUser;
}

