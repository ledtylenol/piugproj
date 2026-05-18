import { Link } from 'react-router-dom'


export default function Help() {

	return (
		<div className="page-help">
			<div className="help-header">
				<p className="eyebrow">Ghidul</p>
				<h1 className="help-title">Cum Functioneaza Partile</h1>
				<p className="help-intro">
					O reteta pe parti prezinta <strong>relatia intre ingrediente</strong>, in loc de cantitatea lor absoluta.
				</p>
			</div>

			{/* Core concept */}
			<section className="help-section">
				<h2>Ideea Principala</h2>
				<p>
					In loc sa spunem <em>"200g faina, 400ml lapte, 2 oua"</em>, o reteta pe parti spune{' '}
					<em>"2 parti faina, 4 parti lapte, 1 parte ou"</em>. Numerele exprima proportii, nu cantitati.
				</p>
			</section>

			{/* Scaling */}
			<section className="help-section">
				<h2>Scalarea</h2>
				<p>
					Avantajul partilor este scalarea intuitiva. Vrei clatite dar ai un singur ou? Imparte partile la 3.
				</p>
				<div className="help-scale-demo">
					<div className="scale-col">
						<p className="scale-heading">Cantitate mica</p>
						<p className="scale-unit">1 parte = 1 ou (~50g)</p>
						<div className="scale-list">
							<div className="scale-row"><span>1 × 50g</span><span>= 50g oua</span></div>
							<div className="scale-row"><span>2 × 50g</span><span>= 100g lapte</span></div>
							<div className="scale-row"><span>2 × 50g</span><span>= 100g faina</span></div>
						</div>
					</div>
					<div className="scale-arrow">→</div>
					<div className="scale-col">
						<p className="scale-heading">Cantitate Mare</p>
						<p className="scale-unit">1 parte = 3 oua (~150g)</p>
						<div className="scale-list">
							<div className="scale-row"><span>1 × 150g</span><span>= 150g oua</span></div>
							<div className="scale-row"><span>2 × 150g</span><span>= 300g lapte</span></div>
							<div className="scale-row"><span>2 × 150g</span><span>= 300g faina</span></div>
						</div>
					</div>
				</div>
				<p className="help-aside">
					In aplicatie, <strong>Scale ×</strong> controleaza scalarea direct din pagina.
				</p>
			</section>

			{/* Parts don't need to be integers */}
			<section className="help-section">
				<h2>Partile pot fi orice numar</h2>
				<p>
					Partile nu trebuie sa fie numere intregi, dar este recomandat pentru a ramane intuitive, sau cel putin cu cat mai putine zecimale.
				</p>
			</section>

			{/* Units */}
			<section className="help-section">
				<h2>Alegerea unitatii</h2>
				<p>
					Unitatile vor determina cum masori cantitatile. Din motivul acesta, este recomandat sa folositi greutate intrucat volumul poate varia din diverse motive, dar greutatea ramane constanta.
				</p>
				<div className="help-rules">
					<div className="help-rule">
						<p><strong>Folositi aceeasi unitate pentru toate ingredientele.</strong> Nu amestecati "50g de oua" cu "100ml de lapte".</p>
					</div>
				</div>
			</section>

			{/* CTA */}
			<div className="help-cta">
				<p>Pregatiti?</p>
				<Link to="/new" className="btn-primary">Incepeti o noua reteta →</Link>
			</div>
		</div>
	)
}
