<template>
	<div v-if="visible" class="block">
		<div class="title">
			{{ $t('pages.resources.resources_buy') }}
		</div>
		<div class="content">
			<div class="block-table text-center">
				<div class="grid grid-cols-3">
					<div class="col-span-2 th middle">
						<div>
							<i18n-t keypath="pages.resources.resources_buy_info" tag="div" scope="global">
								<template v-slot:metal>
									<Colored :value="data['metal'] || 0"/>
								</template><template v-slot:crystal>
									<Colored :value="data['crystal'] || 0"/>
								</template><template v-slot:deuterium>
									<Colored :value="data['deuterium'] || 0"/>
								</template>
							</i18n-t>
						</div>
					</div>
					<div class="col-span-1 th middle">
						<span v-if="!data['time']">
							<a @click.prevent="buyResources" class="button">{{ $t('pages.resources.resources_buy_button') }}</a>
						</span>
						<span v-else>
							{{ $t('pages.resources.resources_buy_timeout') }}
							<br>
							{{ $formatTime(data['time']) }}
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { openConfirmModal, useApiSubmit, useSuccessNotification, refreshNuxtData, useI18n } from '#imports';
	import { computed } from 'vue';
	import { storeToRefs } from 'pinia';
	import useStore from '~/store';

	defineProps({
		data: Object,
	});

	const { t } = useI18n();
	const { user, planet } = storeToRefs(useStore());

	const visible = computed(() => {
		return planet.value.type === 1 && user.value.vacation === null;
	});

	function buyResources() {
		openConfirmModal(
			null,
			t('pages.resources.resources_buy_confirm'),
			[{
				title: t('pages.resources.resources_buy_confirm_no'),
			}, {
				title: t('pages.resources.resources_buy_confirm_yes'),
				handler: () => {
					useApiSubmit('/resources/buy', {}, (result) => {
						useSuccessNotification(t('pages.resources.resources_buy_success', result));

						refreshNuxtData();
					});
				}
			}]
		);
	}
</script>