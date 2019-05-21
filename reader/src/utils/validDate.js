export default{
	validPhone(value){
		return /^1[3456789]\d{9}$/.test(value);
	},
	validPwd(value){

		return new RegExp('^[!@\\.\\w]{8,16}$').test(value);

	},
	validEqual(v1, v2) {
		return Object.is(v1, v2);
	}
	
}
