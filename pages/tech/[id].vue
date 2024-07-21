<template>
	<div id="rf_techinfo"></div>
</template>

<script setup>
	import { ECOTree } from '~/utils/techtree'
	import { showError, useAsyncData, useHead, useI18n, definePageMeta, useRoute } from '#imports';
	import useStore from '~/store';
	import { onMounted } from 'vue';

	definePageMeta({
		view: {
			resources: false,
		}
	});

	const { t } = useI18n();

	const { data: page, error } = await useAsyncData(async () => {
		return await useStore().loadPage();
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	useHead({
		title: t('tech.' + page.value['element']),
	});

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
			window.object.add(tid, prntid, '<div class="tch_tx_nmcont"><span class="tch_tx_name">'+t('tech.' + data.id)+'</span></div><img id="tch_img_'+tid+'" name="'+element+'" src="'+'/images/gebaeude/' + data.id+'.gif" class="tch_icon_' + active + '"><div class="tch_tx_lvl">'+level+'</div>', null, null, active, active, active);
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
				let actclr = 'lime';

				if (req[1] < req[3])
					actclr = 'red';

				let lvtmp = '';

				if (req[2] !== -1)
					lvtmp = '<font color='+actclr+'>' + req[1] + '</font><font color=gold>+'+req[2]+'</font>/<font color=lime>' + req[3] + '</font>';
				else
					lvtmp = '<font color='+actclr+'>' + req[1] + '</font>/<font color=lime>' + req[3] + '</font>';

				let fwrld = '';

				if (req[0] === -1) {
					fwrld = t('tech.' + req[0]);
				}

				createTree(counter + 1, tid, req[0], lvtmp, req[1] < req[3], fwrld);
			}
		}

		window.object.UpdateTree();
	}
</script>