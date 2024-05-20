export default function ({ store, route, redirect })
{
	return;
	if (route.path === '/' && store.state.user !== null)
		return redirect('/overview/')
}