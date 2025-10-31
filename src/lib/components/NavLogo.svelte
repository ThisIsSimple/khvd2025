<script lang="ts">
	interface Props {
		variant?: 'desktop' | 'mobile';
	}

	let { variant = 'desktop' }: Props = $props();
</script>

{#if variant === 'desktop'}
	<!-- Desktop Logo (88x43px) -->
	<svg
		class="logo-svg w-[88px] h-[43px]"
		preserveAspectRatio="none"
		width="100%"
		height="100%"
		overflow="visible"
		viewBox="0 0 88 43"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		role="img"
		aria-label="R=VD Logo"
	>
		<g clip-path="url(#clip0_1751_32187)">
			<path
				d="M0 0V21.6232V23.7486V43H6.88701V23.7486V21.6232V0H0Z"
				class="logo-path"
			/>
			<path
				d="M39.0259 13.7958H30.9532H30.1601H22.9567V20.6454H30.1601H30.9532H39.0259V13.7958Z"
				class="logo-path"
			/>
			<path
				d="M39.0259 24.0702H30.9532H30.1601H22.9567V30.9198H30.1601H30.9532H39.0259V24.0702Z"
				class="logo-path"
			/>
			<path
				d="M49.4784 26.6815L49.2133 24.2291L46.5932 0.0128873H39.6667L42.3657 24.9616L42.6313 27.4139L44.3218 43H51.2487L49.4784 26.6815Z"
				class="logo-path"
			/>
			<path
				d="M56.6381 0.0128873L54.4385 20.3447L54.1734 22.7971L51.983 43H58.9094L61.0205 23.53L61.2861 21.0777L63.565 0.0128873H56.6381Z"
				class="logo-path"
			/>
			<path
				d="M9.66536 0H7.65206V6.84959H9.55468C12.096 6.84959 14.1563 8.89866 14.1563 11.4262H21.0433C21.0433 11.3881 21.0433 11.3499 21.0433 11.3118C21.0411 5.06416 15.9477 0 9.66536 0Z"
				class="logo-path"
			/>
			<path
				d="M14.1563 12.1876C14.1563 14.7151 12.096 16.7642 9.55468 16.7642H7.65638V23.6138H9.55468C15.8996 23.6138 21.0433 18.4981 21.0433 12.1876H14.1563Z"
				class="logo-path"
			/>
			<path
				d="M16.7705 41.6334L17.4913 43H25.2691L22.8682 38.4503L22.0529 36.9049L15.4412 24.3757H7.66339L15.9547 40.088L16.7705 41.6334Z"
				class="logo-path"
			/>
			<path
				d="M65.8089 0V21.6232V23.7486V43H72.6959V23.7486V21.6232V0H65.8089Z"
				class="logo-path"
			/>
			<path
				d="M81.113 14.438V21.1196H88V14.3231C88 6.42431 81.5703 0.0166461 73.6283 0H73.4831V6.84905C77.697 6.84905 81.113 10.2465 81.113 14.4375V14.438Z"
				class="logo-path"
			/>
			<path
				d="M81.113 21.8804V28.5609C81.113 32.7525 77.6965 36.1504 73.482 36.1504H73.4723V43H73.482C81.5001 43 88 36.5354 88 28.5609V21.8804H81.113Z"
				class="logo-path"
			/>
		</g>
		<defs>
			<clipPath id="clip0_1751_32187">
				<rect width="88" height="43" fill="white" />
			</clipPath>
		</defs>
	</svg>
{:else}
	<!-- Mobile Logo (50x25px) -->
	<svg
		class="logo-svg w-[50px] h-[25px]"
		preserveAspectRatio="none"
		width="100%"
		height="100%"
		overflow="visible"
		viewBox="0 0 50 25"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		role="img"
		aria-label="R=VD Logo"
	>
		<g clip-path="url(#clip0_1752_31934)">
			<path
				d="M0 0V12.5716V13.8073V25H3.91308V13.8073V12.5716V0H0Z"
				class="logo-path"
			/>
			<path
				d="M22.1738 8.02083H17.5871H17.1364H13.0436V12.0031H17.1364H17.5871H22.1738V8.02083Z"
				class="logo-path"
			/>
			<path
				d="M22.1738 13.9943H17.5871H17.1364H13.0436V17.9766H17.1364H17.5871H22.1738V13.9943Z"
				class="logo-path"
			/>
			<path
				d="M28.1127 15.5125L27.9621 14.0867L26.4734 0.0074926H22.5379L24.0714 14.5125L24.2224 15.9383L25.1828 25H29.1186L28.1127 15.5125Z"
				class="logo-path"
			/>
			<path
				d="M32.1807 0.0074926L30.931 11.8283L30.7803 13.2541L29.5358 25H33.4713L34.6707 13.6802L34.8216 12.2545L36.1165 0.0074926H32.1807Z"
				class="logo-path"
			/>
			<path
				d="M5.49168 0H4.34776V3.98232H5.42879C6.87273 3.98232 8.04334 5.17364 8.04334 6.64313H11.9564C11.9564 6.62096 11.9564 6.5988 11.9564 6.57663C11.9552 2.94428 9.06118 0 5.49168 0Z"
				class="logo-path"
			/>
			<path
				d="M8.04334 7.08582C8.04334 8.5553 6.87273 9.74663 5.42879 9.74663H4.35021V13.7289H5.42879C9.03388 13.7289 11.9564 10.7547 11.9564 7.08582H8.04334Z"
				class="logo-path"
			/>
			<path
				d="M9.52869 24.2055L9.93822 25H14.3575L12.9933 22.3548L12.5301 21.4563L8.77344 14.1719H4.3542L9.06517 23.307L9.52869 24.2055Z"
				class="logo-path"
			/>
			<path
				d="M37.3914 0V12.5716V13.8073V25H41.3045V13.8073V12.5716V0H37.3914Z"
				class="logo-path"
			/>
			<path
				d="M46.0869 8.39421V12.2788H50V8.3274C50 3.73506 46.3468 0.00967794 41.8343 0H41.7517V3.98201C44.146 3.98201 46.0869 5.95724 46.0869 8.3939V8.39421Z"
				class="logo-path"
			/>
			<path
				d="M46.0869 12.7212V16.6052C46.0869 19.0421 44.1457 21.0177 41.7511 21.0177H41.7456V25H41.7511C46.3069 25 50 21.2415 50 16.6052V12.7212H46.0869Z"
				class="logo-path"
			/>
		</g>
		<defs>
			<clipPath id="clip0_1752_31934">
				<rect width="50" height="25" fill="white" />
			</clipPath>
		</defs>
	</svg>
{/if}

<style>
	.logo-svg {
		display: block;
	}

	.logo-path {
		fill: #040000;
		transition: fill 300ms ease-in-out;
	}

	.logo-svg:hover .logo-path {
		fill: #fc451e;
	}
</style>
