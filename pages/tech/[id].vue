<template>
	<div id="rf_techinfo"></div>
</template>

<script setup>
	import { ECOTree } from '~/utils/techtree'
	import { showError, useAsyncData, useHead, useI18n, definePageMeta, useRoute, useApiGet } from '#imports';
	import { onMounted } from 'vue';

	definePageMeta({
		view: {
			resources: false,
		}
	});

	const { t } = useI18n();

	const { data: page, error } = await useAsyncData(async () => {
		return await useApiGet('/tech/' + useRoute().params.id);
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	useHead({
		title: t('tech.' + page.value['element']),
	});

	let counter = 0;
	let objectTree;

	onMounted(() => {
		objectTree = new ECOTree('object', 'rf_techinfo');
		createTree(1, -1, page.value['element'], page.value['level'], page.value['access']);
	})

	function createTree (tid, prntid, element, level, access, fwrd) {
		let data = page.value['data'].find((el) => el.id === element);

		let active = "lime";

		if (!access) {
			active = "red";
		}

		if (element !== -1) {
			objectTree.add(tid, prntid, '<div class="tch_tx_nmcont"><span class="tch_tx_name">'+t('tech.' + data.id)+'</span></div><img id="tch_img_'+tid+'" name="'+element+'" src="'+'/images/gebaeude/' + data.id+'.gif" class="tch_icon_' + active + '"><div class="tch_tx_lvl">'+level+'</div>', null, null, active, active, active);
		} else {
			objectTree.add(tid, prntid, '<div class="tch_tx_nmcont"><span class="tch_tx_name">'+fwrd+'</span></div><img id="tch_img_'+tid+'" src="skins/sn_space_blue/images/pixel.png" class="tch_icon_' + active + '"><div class="tch_tx_lvl">'+level+'</div>', null, null, active, active, active);
		}

		counter++;
		objectTree.UpdateTree();

		if (!access) {
			document.querySelector('#tch_img_' + prntid)?.classList.add('tch_icon_red');
		}

		if (element !== -1 && data['req'].length) {
			for (let req of data['req']) {
				let actclr = 'positive';

				if (req[1] < req[3]) {
					actclr = 'negative';
				}

				let lvtmp = '';

				if (req[2] !== -1) {
					lvtmp = '<span class="' + actclr + '">' + req[1] + '</span><span style="color:gold"> + ' + req[2] + '</span>/<span class="positive">' + req[3] + '</span>';
				} else {
					lvtmp = '<span class="' + actclr + '">' + req[1] + '</span>/<span class="positive">' + req[3] + '</span>';
				}

				let fwrld = '';

				if (req[0] === -1) {
					fwrld = t('tech.' + req[0]);
				}

				createTree(counter + 1, tid, req[0], lvtmp, req[1] >= req[3], fwrld);
			}
		}

		objectTree.UpdateTree();
	}
</script>