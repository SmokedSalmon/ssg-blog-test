import type { MouseEvent, FocusEvent } from "react"
import { useState, useCallback} from "react"

export type DropdownMenuItemType = {
    text: string,
    shortText: string,
    action?: (index: number) => void,
}
export type DropdownPropsType = {
    toggleId: string,
    toggleText: string,
    items: DropdownMenuItemType[],
    selected?: number,
    classes?: {
        wrapper?: string,
        toggle?: string,
        menu?: string,
        item?: string,
    }
}

const defaultClasses = {
    wrapper: 'dropdown',
    toggle: 'dropdown-toggle',
    menu: 'dropdown-menu',
    item: 'dropdown-item',
}

const EarthIcon = () => (
    <svg className="icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="1.25em" height="1.25em" viewBox="0 0 32 32" version="1.1">
        <g id="icon-earth" />
        <path d="M16 2.672c-0.004 0-0.007 0-0.011 0-0.002 0-0.003 0-0.005 0-0.005 0-0.010 0.001-0.016 0.001-7.347 0.017-13.296 5.977-13.296 13.327 0 7.348 5.949 13.309 13.296 13.327 0.005 0 0.010 0.001 0.016 0.001 0.002 0 0.004 0 0.005 0 0.004 0 0.008 0 0.011 0 7.36 0 13.328-5.968 13.328-13.328s-5.968-13.328-13.328-13.328zM16.533 10.648c1.413-0.039 2.788-0.225 4.112-0.548 0.399 1.571 0.647 3.382 0.686 5.367h-4.798v-4.819zM16.533 9.582v-5.759c1.437 0.398 2.893 2.314 3.821 5.252-1.231 0.297-2.509 0.47-3.821 0.507zM15.467 3.81v5.772c-1.323-0.037-2.611-0.213-3.852-0.515 0.936-2.956 2.405-4.879 3.852-5.256zM15.467 10.647v4.82h-4.831c0.039-1.988 0.287-3.801 0.687-5.373 1.334 0.326 2.72 0.515 4.144 0.553zM9.563 15.467h-5.811c0.118-2.741 1.139-5.252 2.773-7.241 1.187 0.654 2.446 1.189 3.766 1.589-0.431 1.7-0.689 3.617-0.728 5.652zM9.563 16.533c0.039 2.034 0.297 3.951 0.728 5.651-1.319 0.401-2.579 0.936-3.766 1.59-1.635-1.989-2.656-4.5-2.773-7.241h5.811zM10.636 16.533h4.831v4.814c-1.424 0.038-2.81 0.228-4.145 0.555-0.399-1.571-0.647-3.383-0.686-5.369zM15.467 22.412v5.778c-1.448-0.378-2.919-2.303-3.854-5.263 1.241-0.302 2.53-0.478 3.854-0.515zM16.533 28.178v-5.765c1.313 0.038 2.591 0.211 3.822 0.508-0.928 2.941-2.384 4.86-3.822 5.257zM16.533 21.347v-4.814h4.798c-0.039 1.983-0.286 3.791-0.684 5.361-1.325-0.323-2.7-0.51-4.113-0.548zM22.404 16.533h5.845c-0.118 2.741-1.138 5.251-2.773 7.24-1.197-0.658-2.467-1.197-3.797-1.599 0.43-1.698 0.687-3.611 0.726-5.64zM22.404 15.467c-0.039-2.033-0.297-3.946-0.727-5.646 1.33-0.402 2.599-0.94 3.795-1.598 1.636 1.989 2.658 4.501 2.776 7.244h-5.845zM24.738 7.409c-1.061 0.564-2.18 1.031-3.35 1.385-0.623-2.005-1.498-3.642-2.533-4.717 2.27 0.545 4.297 1.719 5.883 3.332zM13.103 4.087c-1.029 1.073-1.9 2.702-2.521 4.697-1.158-0.353-2.268-0.815-3.319-1.375 1.575-1.602 3.587-2.774 5.84-3.322zM7.259 24.587c1.052-0.561 2.163-1.024 3.322-1.377 0.621 1.997 1.492 3.629 2.522 4.702-2.255-0.549-4.268-1.721-5.844-3.326zM18.855 27.922c1.036-1.075 1.911-2.712 2.535-4.721 1.17 0.355 2.29 0.82 3.351 1.387-1.586 1.614-3.614 2.791-5.886 3.334z" />
    </svg>
)

export default function Dropdown({ toggleId, toggleText, classes, items, selected = 0 }: DropdownPropsType) {
    const [isShow, setShow] = useState(false)
    const [select, setSelect] = useState(selected)
    const { wrapper: wrapperClass, toggle: toggleClass, menu: menuClass, item: itemClass } = { ...defaultClasses, ...classes }

    const onToggle = useCallback(() => {
        setShow(!isShow)
    }, [isShow])

    const onMenuFocusout = useCallback((event: FocusEvent) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            setShow(false)
        }
    }, [])

    return (
        <div className={`${wrapperClass}${isShow ? ' show' : ''}`} onBlur={onMenuFocusout}>
            <button
                type="button"
                id={toggleId}
                className={toggleClass}
                aria-expanded={isShow}
                onClick={onToggle}
            >
                <EarthIcon />
                {items[select]?.shortText || toggleText}
                <i className="separate"></i>
                <i className="down-arrow"></i>
            </button>
            <div
                className={`${menuClass}${isShow ? ' show' : ''}`}
                aria-labelledby={toggleId}
            >
                {items.map((item, index) => (
                    <button
                        key={item.text}
                        type="button"
                        className={`${itemClass}${index === select ? ' active' : ''}`}
                        onClick={(event) => {
                            if (index !== select) (item.action || (() => {}))(index)
                            setSelect(index)
                            setShow(false)
                        }}
                    >
                        {item.text}
                    </button>
                ))}
            </div>
                
        </div>
    )
}