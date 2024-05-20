export default function ({ store, redirect })
{
	return;
	if (store.state.user === null)
		return redirect('/')
}