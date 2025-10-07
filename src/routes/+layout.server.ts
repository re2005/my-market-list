import type { LayoutServerLoad } from './$types';

const getBuildIdentifier = () =>
	process.env.VERCEL_BUILD_ID ?? process.env.VERCEL_DEPLOYMENT_ID ?? process.env.VERCEL_GIT_COMMIT_SHA ?? null;

export const load: LayoutServerLoad = () => {
	return {
		buildNumber: getBuildIdentifier()
	};
};
