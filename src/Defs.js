const DEBUG = process.env.NODE_ENV === 'development';

export default {
	DEBUG,
	BASENAME: DEBUG? '' : '/ygk-kiosk',
}
