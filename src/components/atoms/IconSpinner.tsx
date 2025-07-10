import Icon, {IconProps} from '@/src/components/icons/Icon';

const IconSpinner = (props: Partial<IconProps>) => (
  <Icon icon={"loading"} className={"animate-spin " + props.className}/>
)

export default IconSpinner;