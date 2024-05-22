<template>
	<div id="rf_techinfo"></div>
</template>

<script setup>
	import { ECOTree } from '~/utils/techtree'
	import { showError, useAsyncData, useRoute } from '#imports';
	import useStore from '~/store';
	import { onMounted, watch } from 'vue';

	const route = useRoute();

	const { data: page, error, refresh } = await useAsyncData(async () => {
		return await useStore().loadPage();
	});

	watch(() => route.query, () => refresh());

	if (error.value) {
		throw showError(error.value);
	}

	let counter = 0;

	onMounted(() => {
		window.object = new ECOTree('object', 'rf_techinfo');
		createTree(1, -1, page.value['element'], page.value['level'], page.value['access']);
	})

	function createTree (tid, prntid, element, level, access, fwrd) {
		let data = page.value['data'].find((el) => el.id === element);

		let active = "lime";

		if (!access) {
			active = "red";
		}

		if (element !== -1) {
			window.object.add(tid, prntid, '<div class="tch_tx_nmcont"><span class="tch_tx_name">'+data.name+'</span></div><img id="tch_img_'+tid+'" name="'+element+'" src="'+'/images/gebaeude/' + data.img+'" class="tch_icon_' + active + '"><div class="tch_tx_lvl">'+level+'</div>', null, null, active, active, active);
		} else {
			window.object.add(tid, prntid, '<div class="tch_tx_nmcont"><span class="tch_tx_name">'+fwrd+'</span></div><img id="tch_img_'+tid+'" src="skins/sn_space_blue/images/pixel.png" class="tch_icon_' + active + '"><div class="tch_tx_lvl">'+level+'</div>', null, null, active, active, active);
		}

		counter++;
		window.object.UpdateTree();

		if (!access) {
			document.querySelector('#tch_img_'+prntid)?.classList.add('tch_icon_red');
		}

		if (element !== -1 && data['req'].length) {
			for (let req of data['req']) {
				let actclr = "lime";

				if (req[2] < req[4])
					actclr = "red";

				let lvtmp = '';

				if (req[3] !== -1)
					lvtmp = '<font color='+actclr+'>' + req[2] + '</font><font color=gold>+'+req[3]+'</font>/<font color=lime>' + req[4] + '</font>';
				else
					lvtmp = '<font color='+actclr+'>' + req[2] + '</font>/<font color=lime>' + req[4] + '</font>';

				let fwrld = '';

				if (req[0] === -1)
					fwrld = req[1];

				createTree(counter + 1, tid, req[0], lvtmp, req[2] < req[4], fwrld);
			}
		}

		window.object.UpdateTree();
	}
</script>