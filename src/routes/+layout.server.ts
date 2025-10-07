import type { LayoutServerLoad } from './$types';

const getBuildIdentifier = () =>
	process.env.VERCEL_BUILD_ID ??
	process.env.VERCEL_DEPLOYMENT_ID ??
	process.env.VERCEL_GIT_COMMIT_SHA ??
	null;

console.log('Build identifier:', getBuildIdentifier());

export const load: LayoutServerLoad = () => {
	return {
		buildNumber: getBuildIdentifier()
	};
};
