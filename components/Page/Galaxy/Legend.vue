<template>
	<div class="flex flex-col gap-1 w-72">
		<div class="flex justify-between">
			<div>{{ $t('galaxy.legend.S') }}</div>
			<div><span class="sdivong">S</span></div>
		</div>
		<div class="flex justify-between">
			<div>{{ $t('galaxy.legend.N') }}</div>
			<div><span class="noob">N</span></div>
		</div>
		<div class="flex justify-between">
			<div>{{ $t('galaxy.legend.U') }}</div>
			<div><span class="vacation">U</span></div>
		</div>
		<div class="flex justify-between">
			<div>{{ $t('galaxy.legend.G') }}</div>
			<div><span class="blocked">G</span></div>
		</div>
		<div class="flex justify-between">
			<div>{{ $t('galaxy.legend.I') }}</div>
			<div><span class="inactive">i</span></div>
		</div>
		<div class="flex justify-between">
			<div>{{ $t('galaxy.legend.II') }}</div>
			<div><span class="longinactive">iI</span></div>
		</div>
		<div class="flex justify-between">
			<div><span class="negative">{{ $t('galaxy.legend.A') }}</span></div>
			<div><span class="negative">A</span></div>
		</div>
		<div class="flex justify-between">
			<div><span class="positive">{{ $t('galaxy.legend.GO') }}</span></div>
			<div><span class="positive">GO</span></div>
		</div>
		<div class="flex justify-between">
			<div><span class="neudival">{{ $t('galaxy.legend.SGO') }}</span></div>
			<div><span class="neudival">SGO</span></div>
		</div>
	</div>
</template>