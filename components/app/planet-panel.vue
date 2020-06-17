<template>
	<div v-if="planet" class="row resource-panel">
		<div class="col-md-10 col-sm-10 col-12">
			<div class="row">
				<div class="col-3 text-center">
					<PanelResource :type="'metal'" :resource="planet['resources']['metal']"/>
				</div>
				<div class="col-3 text-center">
					<PanelResource :type="'crystal'" :resource="planet['resources']['crystal']"/>
				</div>
				<div class="col-3 text-center">
					<PanelResource :type="'deuterium'" :resource="planet['resources']['deuterium']"/>
				</div>
				<div class="col-3 text-center">
					<div class="resource-panel-item">
						<InfoPopup :id="4" title="Солнечная батарея" class="resource-panel-item-icon">
							<Popper>
								<client-only>
									<div class="resource-panel-item-tooltip">
										<h1>Энергия</h1>
										<div class="line"></div>
										<table>
											<tr>
												<td>Доступно:</td>
												<td align="right">{{ planet['resources']['energy']['value']|number }}</td>
											</tr>
											<tr>
												<td>Производится:</td>
												<td align="right">{{ planet['resources']['energy']['capacity']|number }}</td>
											</tr>
											<tr>
												<td>Потребление:</td>
												<td align="right">{{ (planet['resources']['energy']['capacity'] - planet['resources']['energy']['value']) | number }}</td>
											</tr>
										</table>
									</div>
								</client-only>
								<template slot="reference">
									<span class="sprite skin_energy"></span>
									<span class="sprite skin_s_energy"></span>
								</template>
							</Popper>
						</InfoPopup>
						<div class="neutral">{{ $t('RESOURCES.energy') }}</div>
						<div title="Доступно энергии">
							<span :class="[planet['resources']['energy']['value'] >= 0 ? 'positive' : 'negative']">{{ planet['resources']['energy']['value']|number }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-2 col-sm-2 col-12">
			<div class="row">
				<div class="col text-center">
					<div class="resource-panel-item">
						<nuxt-link to="/credits/" class="d-sm-inline-block resource-panel-item-icon">
							<Popper>
								<client-only>
									<table width="550">
										<tr>
											<td v-for="officier in user['officiers']" class="text-center">
												<div class="separator"></div>
												<span :class="['officier', 'of'+officier['id']+(officier['time'] > ((new Date).getTime() / 1000) ? '_ikon' : '')]"></span>
											</td>
										</tr>
										<tr>
											<td v-for="officier in user['officiers']" class="text-center">
												<span v-if="officier['time'] > $store.getters.getServerTime">Нанят до <font class="positive">{{ officier['time'] | date('d.m.Y H:i') }}</font></span>
												<span v-else><font class="positive">Не нанят</font></span>
											</td>
										</tr>
									</table>
								</client-only>
								<template slot="reference">
									<span class="sprite skin_kredits"></span>
								</template>
							</Popper>
						</nuxt-link>
						<div class="neutral">Кредиты</div>
						{{ user['credits'] | number }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import PanelResource from './planet-panel-resource.vue'
	import InfoPopup from '~/components/page/info/popup.vue'

	export default {
		name: "planet-panel",
		components: {
			PanelResource,
			InfoPopup,
		},
		data () {
			return {
				updated: 0,
				timer: null
			}
		},
		computed: {
			planet () {
				return this.$store.state.planet || false;
			},
			user () {
				return this.$store.state.user || false;
			}
		},
		methods:
		{
			update ()
			{
				if (typeof this.planet === 'undefined' || this.planet === false)
					return;

				if (this.updated === 0)
					this.updated = (new Date).getTime();

				let factor = ((new Date).getTime() - this.updated) / 1000;

				if (factor < 0)
					return;

				this.updated = (new Date).getTime();
				let resources = {};

				['metal', 'crystal', 'deuterium'].forEach((res) =>
				{
					if (typeof this.planet['resources'][res] === 'undefined')
						return;

					let power = (this.planet['resources'][res]['value'] >= this.planet['resources'][res]['capacity']) ? 0 : 1;

					resources[res] = this.planet['resources'][res]['value'] + ((this.planet['resources'][res]['production'] / 3600) * power * factor);
				});

				if (Object.keys(resources).length > 0)
					this.$store.commit('setPlanetResources', resources)

				this.timer = setTimeout(this.update, 1000);
			}
		},
		created ()
		{
			clearTimeout(this.timer);
			this.update();
		},
		updated ()
		{
			clearTimeout(this.timer);
			this.update();
		},
		destroyed () {
			clearTimeout(this.timer);
		}
	}
</script>