import { PlansTypes } from './components/Plans/PlansTypes';
import { Plans } from './components/Plans/Plans';
import { Type } from './util/Type';
import { defaultTypes } from './util/typeCollection/defaultTypes';
import { CarouselTypes } from './components/Carousel/CarouselTypes';
import { Carousel } from './components/Carousel/Carousel';
import { $, $All } from './util/Helpers';

document.addEventListener("DOMContentLoaded", () => {
    const type = new Type();
    const plans = new Plans();
    const carousel = new Carousel({delay: 3000});
    new App(type, plans, carousel);
});

class App{
    constructor(type, plans, carousel){
        this.addDefinition(type)
            .checkType(plans, carousel, type)
            .initPlans(plans)
            .initCarousel(carousel);
    }
    addDefinition(type){
        type.addDefinition([...defaultTypes]);
        return this;
    }
    checkType(plans, carousel,type){
        new PlansTypes(plans, type);
        new CarouselTypes(carousel, type);
        return this;
    }
    initPlans(plans){
        const plansEls = {
            stickyNav: $('.fixed-nav'),
            stickyNavCover: $All('.fixed-nav__cover'),
            frontCover: $(".fixed-nav__cover--front"),
            submitCover: $(".fixed-nav__cover--submit"),
            open: $All("[data-open=fixedNav]"),
            close: $All("[data-close=fixedNav]"),
            header: $(".header"),
            aboutBtn: $(".submit-box__submit")
        }
        const target = {
            headerBottom: plansEls.header.offsetHeight,
            fixPoint: plansEls.aboutBtn.offsetTop + plansEls.aboutBtn.offsetHeight
        }
        plans.setEvent(plansEls, target);
        return this;
    }
    initCarousel(carousel){
        const els = {
            nextBtn: $('#exploreVideoNext'),
            prevBtn: $('#exploreVideoPrev'),
            slides: $('#exploreVideo').children,
            heading: $('#c-heading'),
            paragraph: $('#c-paragraph'),
        }
        const httpMethod = "get", url = "./data/data.json";
        carousel.render({httpMethod, url, els});
    }
}