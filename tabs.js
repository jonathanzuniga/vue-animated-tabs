Vue.component( 'tabs', {

    template: `
        <div>
            <div class="tabs" ref="tabs">
                <ul>
                    <li v-for="tab in tabs">
                        <a :class="{ 'c-black-90': tab.isActive }" :href="tab.href" @click="selectTab(tab)">{{ tab.name }}</a>
                    </li>
                    <li :style="activeUnderlineStyle" class="active-underline"></li>
                </ul>
            </div>

            <div class="tabs-details">
                <slot></slot>
            </div>
        </div>
    `,

    data() {

        return {
            tabs: [],
            sizes: {},
            activeUnderlineStyle: {
                transform: 'translateX(0)',
                width: '${ sizes[ 0 ].tabWidth }px'
            }
        };

    },

    created() {

        this.tabs = this.$children;

    },

    methods: {

        selectTab( selectedTab ) {

            let size = 0;

            this.tabs.forEach( ( tab, index ) => {

                tab.isActive = ( tab.name == selectedTab.name );

                if ( tab.isActive ) {

                    size = this.sizes[ index ];

                }


            } );

            this.activeUnderlineStyle = {
                transform: `translateX(${ size.tabLeft }px)`,
                width: `${ size.tabWidth }px`
            };

        }

    },

    mounted() {

        this.$nextTick( () => {

            const tabs = this.$refs.tabs;
            const tabsWidth = tabs.clientWidth;
            const tab = tabs.getElementsByTagName( 'li' );
            const sizes = {};

            for ( let i = 0; i < tab.length; i ++ ) {
                
                let tabLeft = tab[ i ].offsetLeft;
                let tabWidth = tab[ i ].clientWidth;

                this.sizes[ i ] = { tabLeft, tabWidth };
            
            }

        } );

    }

} );

Vue.component( 'tab', {

    template: `
        <div :class="{ 'active': isActive }"><slot></slot></div>
    `,

    props: {
        name: { required: true },
        selected: { default: false }
    },

    data() {

        return {
            isActive: false
        };

    },

    computed: {

        href() {

            return '#' + this.name.toLowerCase().replace( / /g, '-' );

        }
    },

    mounted() {

        this.isActive = this.selected;

    }

} );

new Vue( {

    el: '#root'

} );
