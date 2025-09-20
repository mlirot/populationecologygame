// Add this helper function ABOVE your Game component
const getBirdPositions = (count) => {
  const rows = Math.ceil(count / 5); // about 5 birds per row
  const positions = [];
  let birdIndex = 0;

  for (let row = 0; row < rows; row++) {
    const birdsInRow = Math.min(5, count - birdIndex);
    for (let col = 0; col < birdsInRow; col++) {
      positions.push({
        left: `${20 + col * 12}%`,   // spacing horizontally
        top: `${40 + row * 12}%`,    // spacing vertically
      });
      birdIndex++;
    }
  }

  return positions;
};

// Inside your Game component return() JSX where the forest is shown:
<div className="forest-area">
  <img src="/forest.png" alt="Forest" className="forest-bg" />

  {/* Fire overlay - only shows during Forest Fire */}
  {scenario === "Forest Fire" && (
    <img src="/fire.png" alt="Fire" className="fire-overlay" />
  )}

  {/* Birds perched in forest */}
  {getBirdPositions(population).map((pos, idx) => (
    <img
      key={idx}
      src="/bird.png"
      alt="Bird"
      className="bird"
      style={{
        left: pos.left,
        top: pos.top,
      }}
    />
  ))}
</div>
