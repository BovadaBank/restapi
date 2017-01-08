import bcrypt from 'bcrypt'
import { GEN_SALT_WORK_FACTOR } from '../config'

export const encryptPassword = (password) => {
	return new Promise((resolve, reject)=> {
		bcrypt.genSalt(GEN_SALT_WORK_FACTOR, ((err, salt)=> {
			if(err) {
				reject(err);
			}
			resolve(salt);
		}));
	});
};

export const hashPassword = (password, salt) => {
	return new Promise((resolve, reject)=> {
		bcrypt.hash(password, salt, ((err, hash)=> {
			if(err) {
				reject(err);
			}
			resolve(hash);
		}));
	});
};

export const comparePassword = (password, hashed) => {
	return new Promise((resolve, reject)=> {
		bcrypt.compare(password, hashed, ((err, match)=> {
			if(err) {
				reject(err)
			}
			resolve(match)
		}))
	});
}
	
