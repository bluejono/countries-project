import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
// use your own icon import if react-icons is not available
import { GoArrowUpRight } from 'react-icons/go';
import { useTranslation } from 'react-i18next';
import { Switch } from '@/components/ui/switch';

const CardNav = ({
    logo,
    logoAlt = 'Logo',
    items,
    className = '',
    ease = 'power3.out',
    baseColor = '#fff',
    menuColor,
    buttonBgColor,
    buttonTextColor
}) => {
    const { i18n } = useTranslation();
    const isEn = i18n.language && i18n.language.startsWith('en');

    const toggleLanguage = (checked) => {
        i18n.changeLanguage(checked ? 'en' : 'pt');
    };

    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    
    // We keep a ref to the expansion state so effects that trigger on `items` change 
    // know if they should immediately jump the new animation to the expanded (progress = 1) state.
    const isExpandedRef = useRef(isExpanded);
    isExpandedRef.current = isExpanded;

    const navRef = useRef(null);
    const cardsRef = useRef([]);
    const tlRef = useRef(null);

    const calculateHeight = () => {
        const navEl = navRef.current;
        if (!navEl) return 260;

        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        if (isMobile) {
            const contentEl = navEl.querySelector('.card-nav-content');
            if (contentEl) {
                const wasVisible = contentEl.style.visibility;
                const wasPointerEvents = contentEl.style.pointerEvents;
                const wasPosition = contentEl.style.position;
                const wasHeight = contentEl.style.height;

                contentEl.style.visibility = 'visible';
                contentEl.style.pointerEvents = 'auto';
                contentEl.style.position = 'static';
                contentEl.style.height = 'auto';

                contentEl.offsetHeight;

                const topBar = 60;
                const padding = 16;
                const contentHeight = contentEl.scrollHeight;

                contentEl.style.visibility = wasVisible;
                contentEl.style.pointerEvents = wasPointerEvents;
                contentEl.style.position = wasPosition;
                contentEl.style.height = wasHeight;

                return topBar + contentHeight + padding;
            }
        }
        return 260;
    };

    const createTimeline = () => {
        const navEl = navRef.current;
        if (!navEl) return null;

        gsap.set(navEl, { height: 60, overflow: 'hidden' });
        gsap.set(cardsRef.current, { y: 50, opacity: 0 });

        const tl = gsap.timeline({ paused: true });

        tl.to(navEl, {
            height: calculateHeight,
            duration: 0.4,
            ease
        });

        tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');

        return tl;
    };

    useLayoutEffect(() => {
        const tl = createTimeline();
        
        // If the menu was already open and timeline recreated (e.g., from language switch changing items),
        // we must immediately fast-forward it to the fully opened state to prevent the UI from getting stuck.
        if (tl && isExpandedRef.current) {
            tl.progress(1);
        }

        tlRef.current = tl;

        return () => {
            tl?.kill();
            tlRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ease, items]);

    useLayoutEffect(() => {
        const handleResize = () => {
            if (!tlRef.current) return;

            if (isExpanded) {
                const newHeight = calculateHeight();
                gsap.set(navRef.current, { height: newHeight });

                tlRef.current.kill();
                const newTl = createTimeline();
                if (newTl) {
                    newTl.progress(1);
                    tlRef.current = newTl;
                }
            } else {
                tlRef.current.kill();
                const newTl = createTimeline();
                if (newTl) {
                    tlRef.current = newTl;
                }
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isExpanded]);

    const toggleMenu = () => {
        const tl = tlRef.current;
        if (!tl) return;
        if (!isExpanded) {
            setIsHamburgerOpen(true);
            setIsExpanded(true);
            tl.play(0);
        } else {
            setIsHamburgerOpen(false);
            tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
            tl.reverse();
        }
    };

    const setCardRef = i => el => {
        if (el) cardsRef.current[i] = el;
    };

    return (
        <div
            className={`card-nav-container absolute left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] z-[99] top-[1.2em] md:top-[2em] ${className}`}
        >
            <nav
                ref={navRef}
                className={`card-nav ${isExpanded ? 'open' : ''} block h-[60px] p-0 rounded-xl shadow-md relative overflow-hidden will-change-[height]`}
                style={{ backgroundColor: baseColor }}
            >
                <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between p-2 pl-[1.1rem] z-[2] relative">
                    <div
                        className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''} group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px]`}
                        onClick={toggleMenu}
                        role="button"
                        aria-label={isExpanded ? 'Close menu' : 'Open menu'}
                        tabIndex={0}
                        style={{ color: menuColor || '#000' }}
                    >
                        <div
                            className={`hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${isHamburgerOpen ? 'translate-y-[4px] rotate-45' : ''
                                } group-hover:opacity-75`}
                        />
                        <div
                            className={`hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${isHamburgerOpen ? '-translate-y-[4px] -rotate-45' : ''
                                } group-hover:opacity-75`}
                        />
                    </div>

                    <div className="logo-container flex items-center gap-2 font-black tracking-tight absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ color: menuColor || '#000' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                            <path d="M2 12h20"/>
                        </svg>
                        <span className="text-xl">GeoWorld</span>
                    </div>

                    <div className="flex items-center gap-2 mr-2 z-10" style={{ color: menuColor || '#000' }}>
                        <span className="text-xs font-bold font-mono">PT</span>
                        <Switch 
                            checked={isEn} 
                            onCheckedChange={toggleLanguage} 
                            className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-green-600 cursor-pointer"
                            title="Trocar Idioma"
                        />
                        <span className="text-xs font-bold font-mono">EN</span>
                    </div>
                </div>

                <div
                    className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-[1] ${isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
                        } md:flex-row md:items-end md:gap-[12px]`}
                    aria-hidden={!isExpanded}
                >
                    {(items || []).slice(0, 3).map((item, idx) => {
                        const isExternal = item.href && (item.href.startsWith('http') || item.href.startsWith('mailto'));
                        const CardWrapper = item.href ? (isExternal ? 'a' : Link) : 'div';
                        const linkProps = item.href ? {
                            [isExternal ? 'href' : 'to']: item.href,
                            target: isExternal ? '_blank' : undefined,
                            rel: isExternal ? 'noopener noreferrer' : undefined,
                            onClick: () => {
                                if (isExpanded && !isExternal) {
                                    toggleMenu();
                                }
                            }
                        } : {};

                        return (
                            <CardWrapper
                                key={`${item.label}-${idx}`}
                                className={`nav-card select-none relative flex flex-col justify-center items-center gap-2 p-[12px_16px] rounded-[calc(0.75rem-0.2rem)] min-w-0 flex-[1_1_auto] h-auto min-h-[60px] md:h-full md:min-h-0 md:flex-[1_1_0%] ${item.href ? 'cursor-pointer transition-opacity duration-300 hover:opacity-85 no-underline' : ''}`}
                                ref={setCardRef(idx)}
                                style={{ backgroundColor: item.bgColor, color: item.textColor }}
                                {...linkProps}
                            >
                                <div className="nav-card-label font-bold tracking-[-0.5px] text-[18px] md:text-[22px] text-center w-full">
                                    {item.label}
                                </div>
                            </CardWrapper>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
};

export default CardNav;
