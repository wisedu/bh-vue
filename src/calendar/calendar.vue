<template>
    <div class='full-clndr'></div>
</template>

<script>
    /**
     * 日历控件
     * @module Calendar
     *
     * @fires item-click -点击日期的时候触发
     * @fires next-month -切换到下月时候触发
     * @fires last-month -切换到上月时候触发
     * @fires month-change -切换到其他月分时候触发
     * @fires today -切换到当日时候触发
     *
     * @example
     *     <caption>html</caption>
     *     <calendar :events='events'></calendar>
     * @example
     *     <caption>javascript</caption>
     *     import Calendar from 'components/calendar/calendar'
     *     export default {
     *        data: function() {
     *            return {
     *                events: [
     *                    {start:'2016-07-06', end:'2016-07-06', title:'CLNDR GitHub Page Finished', url:'http://github.com/kylestetz/CLNDR'},
     *                    {start:'2016-07-11', end:'2016-07-30', title:'CLNDR GitHub Page Finished', url:'http://github.com/kylestetz/CLNDR'}
     *                ]
     *            };
     *        },
     *        components: {Calendar}
     *     }
     */

    import Festivals from './festivals';

    var defaultTmpl = require('./tmpl.html');

    export default {
        data: () => {
            return {
                _instance: null
            };
        },
        /**
         * @property {Array} [events] 事件列表
         * @property {String} [template] 自定义模板，模板实现方法参照'http://kylestetz.github.io/CLNDR/'
         */
        props: {
            events: Array,
            template: {
                type: String,
                default: defaultTmpl
            }
        },
        methods: {
            /**
             * 切换到后一个月
             */
            forward () {
                this._instance.forward();
            },
            /**
             * 切换到前一个月
             */
            back () {
                this._instance.back();
            },
            /**
             * 切换到月份
             * @param {Number/String} month 月份，可以用整数(0-11)或字符串('February')表示
             */
            setMonth (month) {
                this._instance.setMonth(month);
            },
            /**
             * 切换到下一年
             */
            nextYear () {
                this._instance.nextYear();
            },
            /**
             * 切换到上一年
             */
            previousYear () {
                this._instance.previousYear();
            },
            /**
             * 切换到年份
             * @param {Number} year 年份
             */
            setYear (year) {
                this._instance.setYear(year);
            },
            /**
             * 设置事件列表，调用此方法会重新渲染控件
             * @param {Array} events 事件列表
             */
            setEvents (events) {
                var data = JSON.parse(JSON.stringify(events));
                this._instance.setEvents(data);
            },
            /**
             * 增加事件列表，调用此方法会重新渲染控件
             * @param {Array} events 事件列表
             */
            addEvents (events) {
                this._instance.addEvents(events);
            }
        },
        ready () {
            var vm = this;
            var el = $(vm.$el);

            vm._instance = el.clndr({
                template: this.template,
                multiDayEvents: {
                    startDate: 'start',
                    endDate: 'end'
                },
                events: this.events,
                extras: {
                    festivals: Festivals
                },
                clickEvents: {
                    click (target) {
                        var elem = target.element;
                        $(elem).siblings().removeClass('selected');
                        $(elem).addClass('selected');
                        vm.$dispatch('item-click', target);
                        return false;
                    },
                    nextMonth (month) {
                        vm.$dispatch('next-month', month);
                    },
                    previousMonth (month) {
                        vm.$dispatch('last-month', month);
                    },
                    onMonthChange (month) {
                        vm.$dispatch('month-change', month);
                    },
                    today (month) {
                        vm.$dispatch('today', month);
                    }
                }
            });

            vm.$watch('events', (vals) => {
                vm.setEvents(vals);
            });
        }
    };
</script>

<style lang='less'>
    @bg-color: #ebebeb;
    @full-shadow: #343434;
    @festival-color: ##111;
    @bg-title: #414141;
    @bg-days: #3883a3;
    @day-color: #4f4f4f;
    @select-border: #a55;

    .full-clndr {
        width: 100%;
        background-color: @bg-color;
        font-weight: 700;
        -moz-box-shadow: 0px 4px 0 @full-shadow;
        -webkit-box-shadow: 0px 4px 0 @full-shadow;
        box-shadow: 0px 4px 0 @full-shadow;

        .festival {
            color: @festival-color;
        }

        .clndr-controls {
            padding: 14px;
            background-color: @bg-title;
            color: white;
            text-align: center;

            .clndr-previous-button {
                float: left;
                text-align: left;
            }

            .clndr-next-button {
                float: right;
                text-align: right;
            }

            .clndr-previous-button, .clndr-next-button {
                width: 30px;
                cursor: pointer;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
            }

            .clndr-previous-button:hover, .clndr-next-button:hover {
                opacity: 0.5;
            }
        }

        .clndr-grid {
            float: left;
            width: 100%;
            border: none;

            .days-of-the-week {
                width: 100%;
                background-color: @bg-days;
            }

            .days-of-the-week .header-day {
                float: left;
                width: 14.2857%;
                padding: 14px;
                text-align: center;
                color: white;
            }

            .days {
                width: 100%;

                .day, .empty {
                    float: left;
                    width: 14.2857%;
                    height: 66px;
                    padding: 24px 0;
                    text-align: center;
                    color: @day-color;
                    background-color: @bg-color;
                    border-bottom: 2px solid white;
                    background-image: url('./imgs/triangle.svg');
                    background-size: cover;
                    background-position: center;
                }

                .day.event .day-number, .empty.event .day-number {
                    padding-bottom: 4px;
                    border-bottom: 2px solid @bg-days;
                }

                .day.adjacent-month .day-number, .empty.adjacent-month .day-number {
                    opacity: 0.3;
                }

                .today {
                    background-color: white;
                    background-image: none;
                }

                .day.event {
                    cursor: pointer;
                }

                .day.selected {
                    border-color: @select-border;
                }
            }
        }

        .noselect {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
        }

        @media all and (max-width: 768px) {
            .clndr-grid {
                width: 100%;
                border: none;
            }
        }
    }
</style>
