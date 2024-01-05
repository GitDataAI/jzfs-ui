import React, {useCallback, useEffect, useRef, useState, ForwardRefRenderFunction} from 'react';
import dayjs from "dayjs";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";
import Overlay from "react-bootstrap/Overlay";
import Table from "react-bootstrap/Table";
import {OverlayTrigger} from "react-bootstrap";
import {CheckIcon, PasteIcon, SearchIcon, SyncIcon} from "@primer/octicons-react";
import {Link} from "./nav";
import {
    Box,
    Button as MuiButton,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography
} from "@mui/material";
import InputGroup from "react-bootstrap/InputGroup";
import { ActionGroupProps, ActionsBarProps, AlertErrorProps, CheckboxProps, ClipboardButtonProps, CopyTextToClipboard, DataTableProps, DebounceOptions, DebouncedFormControlProps, ExitConfirmationDialogProps, ExperimentalOverlayTooltipProps, FormattedDateProps, Func, GrayOutProps, LinkButtonProps, PrefixSearchWidgetProps, ProgressSpinnerProps, RefreshButtonProps, ToggleSwitchProps, TooltipButtonProps, UseDebounce, UseDebouncedState, WarningProps, WrapIfProps } from './interface/comp_interface';


const defaultDebounceMs = 300;

export const debounce = ({func, wait, immediate = false}:DebounceOptions):Func => {
    let timeout:NodeJS.Timeout | null = null;
    return function(this:any , ...args:any[]){
        const context = this;
        let later = function() {
            timeout = null;
            if (!immediate) func.apply(null, args);
        };
        let callNow = immediate && !timeout;
        if(timeout) clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

export const useDebounce: UseDebounce = (func, wait = defaultDebounceMs) => {
    const debouncedRef = useRef(debounce({func, wait}));
    return debouncedRef;
};
export const useDebouncedState: UseDebouncedState = (dependsOn, debounceFn, wait = 300) => {
    const [state, setState] = useState(dependsOn);
    useEffect(() => setState(dependsOn), [dependsOn]);
    const dfn = useDebounce(debounceFn, wait);

    return [state, newState => {
        setState(newState)
        dfn.current(newState)
    }];
}

export const DebouncedFormControl: ForwardRefRenderFunction<HTMLInputElement, DebouncedFormControlProps> = (props, ref) => {
    const onChange = debounce({func: props.onChange, wait: props.debounce !== undefined ? props.debounce : defaultDebounceMs});
    return (<Form.Control ref={ref} {...{...props, onChange}}/>);
};
DebouncedFormControl.displayName = "DebouncedFormControl";

export const Loading = () => {
    return (
        <Alert variant={"info"}>Loading...</Alert>
    );
};

export const Na = () => {
    return (
        <span>&mdash;</span>
    );
};

export const AlertError: React.FC<AlertErrorProps> = ({error, onDismiss = null, className = undefined}) => {
    if (error === null) {
        return null; 
    }

    let content = React.isValidElement(error) ? error : error.toString();
    // handle wrapped errors
    let err= error;
    while (!(err instanceof Error) && err != null && err.error) err = err.error;
    if (err instanceof Error) content = err.message;
    if (onDismiss !== null) {
        return <Alert className={className} variant="danger" dismissible onClose={onDismiss}>{content}</Alert>;
    }
    
    return (
        <Alert className={className} variant="danger">{content}</Alert>
    );
};

export const FormattedDate:React.FC<FormattedDateProps> = ({ dateValue, format = "MM/DD/YYYY HH:mm:ss" }) => {
    if (typeof dateValue === 'number') {
        return (
            <span>{dayjs.unix(dateValue).format(format)}</span>
        );
    }

    return (
        <OverlayTrigger placement="bottom" overlay={<Tooltip>{dateValue}</Tooltip>}>
            <span>{dayjs(dateValue).format(format)}</span>
        </OverlayTrigger>
    );
};


export const ActionGroup:React.FC<ActionGroupProps> = ({ children, orientation = "left" }) => {
    const side = (orientation === 'right') ? 'ms-auto' : '';
    return (
        <div role="toolbar" className={`${side} mb-2 btn-toolbar action-group-${orientation}`}>
            {children}
        </div>
    );
};

export const ActionsBar:React.FC<ActionsBarProps> = ({ children }) => {
    return (
        <div className="action-bar d-flex mb-3">
            {children}
        </div>
    );
};

export const copyTextToClipboard:CopyTextToClipboard = async (text, onSuccess, onError) => {
    const textArea = document.createElement('textarea');
    
    //
    // *** This styling is an extra step which is likely not required. ***
    //
    // Why is it here? To ensure:
    // 1. the element is able to have focus and selection.
    // 2. if element was to flash render it has minimal visual impact.
    // 3. less flakyness with selection and copying which **might** occur if
    //    the textarea element is not visible.
    //
    // The likelihood is the element won't even render, not even a
    // flash, so some of these are just precautions. However in
    // Internet Explorer the element is visible whilst the popup
    // box asking the user for permission for the web page to
    // copy to the clipboard.
    //

    // Place in top-left corner of screen regardless of scroll position.
    textArea.style.position = 'fixed';
    textArea.style.top = "0";
    textArea.style.left = "0";

    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    textArea.style.width = '2em';
    textArea.style.height = '2em';

    // We don't need padding, reducing the size if it does flash render.
    textArea.style.padding = "0";

    // Clean up any borders.
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';

    // Avoid flash of white box if rendered for any reason.
    textArea.style.background = 'transparent';
    
    if(typeof text === 'string') textArea.value = text;
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    let err = null;
    
    try {
        if ('clipboard' in navigator) {            
            typeof text === 'string'? await navigator.clipboard.writeText(text) :  new Error('text\'s type is Array<string>');
        } else {
            typeof text === 'string'? document.execCommand('copy', true, text):  new Error('text\'s type is Array<string>');
        }
    } catch (e) {
        err = e;
    }

    if (!!onSuccess && err === null) {
        onSuccess();
    }
    if (!!onError && err !== null) {
        onError(err);
    }

    document.body.removeChild(textArea);
};

export const useHover = () => {
    const [value, setValue] = useState(false);

    const ref = useRef<EventTarget>(null);

    const handleMouseOver = () => setValue(true);
    const handleMouseOut = () => setValue(false);

    useEffect(
        () => {
            const node = ref.current;
            if (node) {
                node.addEventListener('mouseover', handleMouseOver);
                node.addEventListener('mouseout', handleMouseOut);

                return () => {
                    node.removeEventListener('mouseover', handleMouseOver);
                    node.removeEventListener('mouseout', handleMouseOut);
                };
            }
        },
        [ref] // Recall only if ref changes
    );

    return [ref, value];
};

export const LinkButton:React.FC<LinkButtonProps> = ({ href, children, buttonVariant, tooltip = null }) => {
    if (tooltip === null) {
        return <Link href={href} component={Button} variant={buttonVariant}>{children}</Link>
    }
    return (
        <Link href={href} component={TooltipButton} tooltip={tooltip} variant={buttonVariant}>{children}</Link>
    );
};

export const TooltipButton:React.FC<TooltipButtonProps> = ({ onClick, variant, children, tooltip, className="", size = "sm" }) => {
    if(size !== "md") 
    return (
        <OverlayTrigger placement="bottom" overlay={<Tooltip>{tooltip}</Tooltip>}>
            <Button variant={variant} onClick={onClick} className={className} size={size}>
                {children}
            </Button>
        </OverlayTrigger>
    );
};

export const ClipboardButton:React.FC<ClipboardButtonProps> = ({ text, variant, onSuccess, icon = <PasteIcon/>, onError, tooltip = "Copy to clipboard", ...rest}) => {

    const [show, setShow] = useState<boolean | undefined>(false);
    const [copied, setCopied] = useState(false);
    const [target, isHovered] = useHover();
    const currentIcon = (!copied) ? icon : <CheckIcon/>;

    let updater: (() => void) | null | undefined = null;
    let current
    if (typeof target !== 'boolean') {
        current = target.current;
    }
    
    if(onSuccess)
    return (
        <>
            <Overlay
                placement="bottom"
                show={show || (typeof isHovered === 'boolean' ? isHovered : false)}
                target={current}>
                {props => {
                    updater = props.popper && props.popper.scheduleUpdate;
                    return (<Tooltip {...props}>{tooltip}</Tooltip>)
                }}
            </Overlay>
            <Button variant={variant} ref={target} onClick={() => {
                setShow(false)
                setCopied(true)
                if (typeof updater == 'function') updater()
                if(  typeof target !== 'boolean')
                setTimeout(() => {
                    if (target.current !== null) setCopied(false)
                }, 1000);
                copyTextToClipboard(text, onSuccess, onError);
            }} {...rest}>
                {currentIcon}
            </Button>
        </>
    );
};

export const PrefixSearchWidget:React.FC<PrefixSearchWidgetProps> = ({ onFilter, text = "Search by Prefix", defaultValue = "" }) => {

    const [expanded, setExpanded] = useState(!!defaultValue)

    const toggle = useCallback((e:React.MouseEvent) => {
        e.preventDefault()
        setExpanded((prev) => {
            return !prev
        })
    }, [setExpanded])

    const ref = React.useRef<HTMLInputElement>(null);

    const handleSubmit = useCallback((e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(ref.current) onFilter(ref.current.value)
    }, [ref])

    if (expanded) {
        return (
            <Form onSubmit={handleSubmit}>
                <InputGroup>
                    <Form.Control
                        ref={ref}
                        autoFocus
                        defaultValue={defaultValue}
                        placeholder={text}
                        aria-label={text}
                    />
                    <Button variant="light" onClick={toggle}>
                        <SearchIcon/>
                    </Button>
                </InputGroup>
            </Form>
        )
    }

    return (
        <OverlayTrigger placement="bottom" overlay={
            <Tooltip>
                {text}
            </Tooltip>
        }>
            <Button variant="light" onClick={toggle}>
                <SearchIcon/>
            </Button>
        </OverlayTrigger>
    )
}

export const RefreshButton:React.FC<RefreshButtonProps> = ({ onClick, size = "md", variant = "light", tooltip = "Refresh", icon = <SyncIcon/> }) => {
    return (
        <TooltipButton
            tooltip={tooltip}
            variant={variant}
            onClick={onClick}
            size={size}>
            {icon}
        </TooltipButton>
    );
};

export const DataTable:React.FC<DataTableProps> = ({ headers, results, rowFn, keyFn = (row) => row[0], actions = [], emptyState = null }) => {

    if ((!results || results.length === 0) && emptyState !== null) {
        return <Alert variant="warning">{emptyState}</Alert>;
    }

    return (
        <Table>
            <thead>
                <tr>
                {headers.map(header => (
                    <th key={header}>{header}</th>
                ))}
                {(!!actions && actions.length > 0) && <th/>}
                </tr>
            </thead>
            <tbody>
            {results.map(row => (
                <tr key={keyFn(row)}>
                    {rowFn(row).map((cell, i) => (
                        <td key={`${keyFn(row)}-${i}`}>
                            {cell}
                        </td>
                    ))}
                    {(!!actions && actions.length > 0) && (
                        <td>
                            <span className="row-hover">
                                {actions.map(action => (
                                    <span key={`${keyFn(row)}-${action.key}`}>
                                        {action.buttonFn(row)}
                                    </span>
                                ))}
                             </span>
                        </td>
                    )}
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export const Checkbox:React.FC<CheckboxProps> = ({ name, onAdd, onRemove, disabled = false, defaultChecked = false }) => {
    return (
        <Form.Group>
            <Form.Check defaultChecked={defaultChecked} disabled={disabled} type="checkbox" name={name} onChange={(e) => {
                if (e.currentTarget.checked) {
                    onAdd(name)
                } else {
                    onRemove(name)
                }
            }}/>
        </Form.Group>
    );
};

export const ToggleSwitch:React.FC<ToggleSwitchProps> = ({  label, id, defaultChecked, onChange }) => {
    return (
        <Form>
            <Form.Switch
                label={label}
                id={id}
                defaultChecked={defaultChecked}
                onChange={(e) => onChange(e.target.checked)}
            />
        </Form>
    )
};

export const Warning:React.FC<WarningProps>= (props) =>
<>
    <Alert variant="warning">
    &#x26A0; { props.children }
    </Alert>
</>;

export const Warnings = ({ warnings = [] }:{warnings:string[]}) => {
    return <ul className="pl-0 ms-0 warnings">
           {warnings.map((warning, i) =>
           <Warning key={i} warnings={[]}>{warning}</Warning>
           )}
       </ul>;
};

export const ProgressSpinner:React.FC<ProgressSpinnerProps> = ({text, changingElement =''}) => {
    return (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Box>
                <CircularProgress size={50}/>
            </Box>
            <Box sx={{p: 4}}>
                <Typography>{text}{changingElement}</Typography>
            </Box>
        </Box>
    );
}

export const ExitConfirmationDialog: React.FC<ExitConfirmationDialogProps> = ({dialogAlert, dialogDescription, onExit, onContinue, isOpen=false}) => {
    return (
        <Dialog
            open={isOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {dialogAlert}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {dialogDescription}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <MuiButton onClick={onContinue} autoFocus>Cancel</MuiButton>
                <MuiButton onClick={onExit}>
                    Exit
                </MuiButton>
            </DialogActions>
        </Dialog>
    );
};


export const ExperimentalOverlayTooltip:React.FC<ExperimentalOverlayTooltipProps> = ({children, show = true, placement="auto"}) => {
    const experimentalTooltip = () => (
        <Tooltip id="button-tooltip" >
            Experimental
        </Tooltip>
    );
    return show ? (
        <OverlayTrigger
            placement={placement}
            overlay={experimentalTooltip()}
        >
            {children}
        </OverlayTrigger>
    ) : <></>;
};

export const GrayOut:React.FC<GrayOutProps> = ({children}) =>
    <div style={{position: 'relative'}}>
               <div>
                   <div className={'gray-out overlay'}/>
                   {children}
               </div>
           </div>;


export const WrapIf:React.FC<WrapIfProps> = ({enabled, Component, children}) => (
    enabled ? <Component>{children}</Component> : children);
