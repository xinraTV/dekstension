import { CardName, CustomCardData, Data, IMAGE_HOSTER_ALLOWLIST } from './model'
import { fromHtml } from './utils'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Button, Form, Input, Popover } from 'antd'
import {
  CheckOutlined,
  InfoCircleOutlined,
  SaveOutlined,
} from '@ant-design/icons'
import { useStore } from './store'

const isAllowedUrl = (_: unknown, value: string) => {
  if (!value) return Promise.resolve()
  const isValid = IMAGE_HOSTER_ALLOWLIST.some((i) => i.pattern.test(value))
  return isValid
    ? Promise.resolve()
    : Promise.reject('URL must match one of the allowed image hosters!')
}

export function addCustomCardUi() {
  const cardDetailsOverlay = document.querySelector(
    'div[class^=cardDetailsOverlay_content]',
  )
  if (!cardDetailsOverlay) return

  const parent = document.querySelector('div[class^=cardForm_left]')
  if (!parent || parent.querySelector('.dx')) return

  const cardName = cardDetailsOverlay.querySelector(
    'h3[class^=cardDetailsOverlay_title]',
  )?.textContent!

  const containerClass = parent
    .querySelector('div[class^=cardForm_prettyBox]')!
    .getAttribute('class')

  const container = fromHtml(`<div class="dx ${containerClass}"></div>`)
  parent.appendChild(container)

  const root = createRoot(container as HTMLElement)
  root.render(<CustomCardUi cardName={cardName} />)
}

const CustomCardUi: React.FC<{ cardName: string }> = ({ cardName }) => {
  const cardData = useStore((state) => state.data.cards[cardName]) || {}
  const setCardData = useStore((state) => state.setCardData)

  const [saving, setSaving] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [showSuccess, setShowSuccess] = React.useState(false)
  React.useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [showSuccess])

  console.log('Rendering custom card UI for:', cardName, cardData)

  const save = async (newData: CustomCardData) => {
    setSaving(true)
    setError(null)
    try {
      await setCardData(cardName, newData)
      setShowSuccess(true)
    } catch (e) {
      console.error('Error saving custom card data:', e)
      setError('Saving data failed: ' + e)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{ width: '100%' }}>
      <label>Dekstension</label>
      <Form
        name={`dx-${cardName}`}
        className="dx-reset"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width: '100%', marginTop: 16 }}
        initialValues={cardData}
        onFinish={save}
        autoComplete="off"
      >
        <Form.Item<CustomCardData> label="Custom name" name="name">
          <Input placeholder="Watch Earthlings" allowClear />
        </Form.Item>

        <Form.Item<CustomCardData>
          label="Custom image"
          name="img"
          rules={[
            {
              validator: isAllowedUrl,
              message: 'Must be a URL of an allowed image hoster!',
            },
          ]}
        >
          <Input
            placeholder="https://i.imgur.com/example.png"
            allowClear
            suffix={
              <Popover
                content={
                  <ul>
                    {IMAGE_HOSTER_ALLOWLIST.map((i) => (
                      <li key={i.label}>{i.label}</li>
                    ))}
                  </ul>
                }
                title="Allowed image hosters"
              >
                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
              </Popover>
            }
          />
        </Form.Item>

        <Form.Item label={null} style={{ marginBottom: 8 }}>
          <Button
            variant="solid"
            color={showSuccess ? 'green' : 'primary'}
            htmlType="submit"
            icon={showSuccess ? <CheckOutlined /> : <SaveOutlined />}
            loading={saving}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export function applyCustomCardData(cardsData: Data['cards']) {
  const cardNodes: Record<CardName, ParentNode> = {}

  document.querySelectorAll('#basicCardImage').forEach((cardImage) => {
    const node = cardImage.parentNode!
    const name = node.firstChild!.firstChild!.textContent!
    cardNodes[name] = node
  })

  Object.keys(cardsData).forEach((cardName) => {
    const node = cardNodes[cardName]
    if (!node) return
    const cardData = cardsData[cardName]
    if (cardData.name && !node.querySelector('.dx-custom-name')) {
      node.appendChild(
        fromHtml(`<span class="dx dx-custom-name">${cardData.name}</span>`),
      )
    }
  })
}
